import type { Equal, Expect } from "@/type-utils";

type AllowedExtension = "png" | "jpg" | "jpeg";

type ValidFileName<T extends string> = T extends `${string}.${infer Extension}` ? Extension extends AllowedExtension ? T : never : never;

function uploadFile<T extends string>(file: ValidFileName<T>) {
  console.log(`Uploading ${file}`);
}

// =====================================================
// 🧪 Test Cases cho ValidFileName
// =====================================================

// ✅ Hợp lệ
type Case1 = Expect<Equal<ValidFileName<"avatar.png">, "avatar.png">>;
type Case2 = Expect<Equal<ValidFileName<"photo.jpg">, "photo.jpg">>;
type Case3 = Expect<Equal<ValidFileName<"photo.jpeg">, "photo.jpeg">>;

// ❌ Không hợp lệ (=> never)
type Case4 = Expect<Equal<ValidFileName<"document.pdf">, never>>;
type Case5 = Expect<Equal<ValidFileName<"music.mp3">, never>>;
type Case6 = Expect<Equal<ValidFileName<"noextension">, never>>;

// =====================================================
// 🧠 Runtime Example
// =====================================================

// ✅ OK
uploadFile("avatar.png");
uploadFile("photo.jpeg");

// ❌ Compile-time Error (type never)
uploadFile("document.pdf");
uploadFile("music.mp3");