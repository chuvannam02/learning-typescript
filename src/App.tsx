import {DynamicForm} from "./_utils/form/DynamicForm.tsx";
import {fetchApi} from "./_utils/common/model/api.ts";
import type {Product} from "./_utils/common/model/types.ts";

function App() {
    // @typescript-eslint/no-unused-vars
    const handleSubmit = async (values: Product) => {
        const res = await fetchApi<Product>('/api/products', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {'Content-Type': 'application/json'},
        });
    };

    return (
        <DynamicForm<Product>
            model={{id: 1, name: '', price: 0, stock: 0}}
            onSubmit={handleSubmit}
        />
    )
}

export default App
