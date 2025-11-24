import requests
import argparse
import sys

# --- CẤU HÌNH API ---
DOCKER_HUB_URL = "https://hub.docker.com/v2"

def get_auth_token(username, password):
    """Lấy token xác thực (JWT) từ Docker Hub."""
    print("-> Đang lấy token xác thực...")
    auth_url = "https://auth.docker.io/token"
    service = "registry.docker.io"
    
    # Scope cho phép kéo/đẩy/xóa cho mọi repository.
    # 'registry:catalog:*' scope cần thiết cho việc xóa manifest
    scope = "registry:catalog:*" 
    
    try:
        response = requests.get(
            auth_url,
            params={
                "service": service,
                "scope": scope
            },
            auth=(username, password)
        )
        response.raise_for_status()
        return response.json().get("token")
    except requests.exceptions.HTTPError as err:
        print(f"LỖI: Không thể xác thực. Vui lòng kiểm tra Username/PAT (Personal Access Token).")
        print(f"Chi tiết lỗi: {err}")
        sys.exit(1)
    except Exception as e:
        print(f"LỖI: Không thể kết nối với Docker Hub. {e}")
        sys.exit(1)


def get_tags(username, repo_name, token):
    """Lấy danh sách các tags và manifest digest của chúng."""
    print(f"-> Đang tải danh sách tags cho {username}/{repo_name}...")
    
    # URL API để lấy danh sách tags và thông tin chi tiết (bao gồm thời gian tạo)
    # Chúng ta sử dụng URL của Registry V2 API (không phải Hub API) để có digest
    tags_url = f"https://registry.hub.docker.com/v2/{username}/{repo_name}/tags/list"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json"
    }

    all_tags = []
    next_url = tags_url
    
    try:
        while next_url:
            response = requests.get(next_url, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            # Docker Hub API trả về tags dưới dạng danh sách đơn giản trong 'tags'
            if 'tags' not in data:
                print("LỖI: Không tìm thấy 'tags' trong phản hồi API. Đã dừng.")
                return []

            # Vì API list/tags không cung cấp ngày tạo, chúng ta phải lấy manifest riêng
            # Để đơn giản hóa ví dụ, ta chỉ lấy tên tag. Việc lấy ngày tạo phức tạp hơn.
            # Trong môi trường thực tế, bạn cần gọi API lấy manifest cho từng tag để có 'last_updated'
            for tag in data.get('tags', []):
                # Để xóa, chúng ta cần digest, ta sẽ lấy digest trong hàm xóa
                all_tags.append(tag)
            
            # Phân trang (Pagination)
            next_url = data.get('next')
            if next_url:
                print("  Đang tải trang tiếp theo...")

        return all_tags
        
    except requests.exceptions.HTTPError as err:
        if response.status_code == 404:
            print(f"LỖI: Repository {username}/{repo_name} không tồn tại hoặc không thể truy cập.")
        else:
            print(f"LỖI: Lỗi HTTP khi tải tags: {err}")
        sys.exit(1)
    except Exception as e:
        print(f"LỖI không xác định khi tải tags: {e}")
        sys.exit(1)


def get_manifest_digest(username, repo_name, tag, token):
    """Lấy Manifest Digest (sha256:...) cần thiết để xóa Image."""
    url = f"https://registry.hub.docker.com/v2/{username}/{repo_name}/manifests/{tag}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.docker.distribution.manifest.v2+json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        # Digest được trả về trong header 'Docker-Content-Digest'
        return response.headers.get("Docker-Content-Digest")
    except requests.exceptions.HTTPError as err:
        # Tag có thể đã bị xóa hoặc không tồn tại (Ví dụ tag: latest)
        print(f"CẢNH BÁO: Không thể lấy digest cho tag '{tag}'. Lỗi: {err}")
        return None


def delete_tag(username, repo_name, tag, digest, token):
    """Xóa manifest (Image) bằng cách sử dụng digest."""
    print(f"-> Đang cố gắng xóa tag: {tag} (Digest: {digest})...")
    
    url = f"https://registry.hub.docker.com/v2/{username}/{repo_name}/manifests/{digest}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.docker.distribution.manifest.v2+json"
    }
    
    try:
        response = requests.delete(url, headers=headers)
        if response.status_code == 204:
            print(f"  THÀNH CÔNG: Đã xóa tag '{tag}' khỏi Registry.")
            return True
        else:
            response.raise_for_status()
            
    except requests.exceptions.HTTPError as err:
        print(f"  LỖI: Không thể xóa tag '{tag}'. Mã lỗi: {response.status_code}. Chi tiết: {err}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Tự động dọn dẹp các tags Docker Hub cũ.")
    parser.add_argument('--user', required=True, help='Tên người dùng Docker Hub.')
    parser.add_argument('--password', required=True, help='Personal Access Token (PAT) của Docker Hub.')
    parser.add_argument('--repo', required=True, help='Tên Repository (ví dụ: my-app-image).')
    parser.add_argument('--keep-latest', type=int, default=5, help='Số lượng tags mới nhất muốn giữ lại.')
    
    args = parser.parse_args()
    
    print(f"--- BẮT ĐẦU DỌN DẸP REPO: {args.user}/{args.repo} ---")
    print(f"Sẽ giữ lại {args.keep_latest} tags MỚI NHẤT.")

    token = get_auth_token(args.user, args.password)
    
    # 1. Lấy tất cả tags
    all_tags = get_tags(args.user, args.repo, token)
    
    if not all_tags:
        print("Không có tags nào được tìm thấy hoặc có lỗi. Đã dừng.")
        return

    # Lưu ý QUAN TRỌNG: 
    # API list/tags trả về danh sách tags, nhưng không đảm bảo thứ tự
    # theo ngày tạo/đẩy. Chúng ta phải **giả định** rằng các tags 
    # có tên là phiên bản (ví dụ: v1.0.10, v1.0.9) có thể được sắp xếp.
    
    # --- PHẦN LOGIC SẮP XẾP/LỌC (CẦN TÙY CHỈNH) ---
    
    # Ví dụ đơn giản: Sắp xếp theo tên tags (giả định tên tags có thể sắp xếp được)
    # Ví dụ: v1.0.9 sẽ đến trước v1.0.10 nếu sắp xếp chuỗi
    # CÁCH LÀM TỐT HƠN là phải gọi Manifest API để lấy 'last_updated' và sắp xếp theo ngày đó.
    
    try:
        # Nếu tags là số hoặc có thể sắp xếp:
        sortable_tags = sorted(all_tags, reverse=True)
    except:
        # Nếu không thể sắp xếp (ví dụ: 'latest', 'test', v.v.)
        sortable_tags = all_tags
        print("CẢNH BÁO: Không thể sắp xếp tags. Dọn dẹp có thể không giữ đúng các bản mới nhất.")

    # Giữ lại các tags mới nhất
    tags_to_keep = sortable_tags[:args.keep_latest]
    tags_to_delete = [tag for tag in sortable_tags if tag not in tags_to_keep]
    
    print(f"\nTags mới nhất ĐƯỢC GIỮ LẠI ({len(tags_to_keep)}): {', '.join(tags_to_keep)}")
    print(f"Tags cần XÓA ({len(tags_to_delete)}): {', '.join(tags_to_delete)}")
    
    # 2. Xóa các tags cũ
    if tags_to_delete:
        print("\n--- BẮT ĐẦU XÓA ---")
        for tag in tags_to_delete:
            # a. Lấy digest
            digest = get_manifest_digest(args.user, args.repo, tag, token)
            
            if digest:
                # b. Xóa bằng digest
                delete_tag(args.user, args.repo, tag, digest, token)
    else:
        print("\nKhông có tags nào cần xóa dựa trên tiêu chí đã đặt.")

if __name__ == "__main__":
    main()
