/**
 * @Project: learning-typescript
 * @Author CHUNAM
 * @Date 11/14/2025
 * @Time 1:04 AM
 */
import { useState } from 'react';

type DynamicFormProps<T> = {
    model: T;
    onSubmit: (values: T) => void;
};

export function DynamicForm<T extends Record<string, any>>({ model, onSubmit }: DynamicFormProps<T>) {
    const [values, setValues] = useState<T>(model);

    const handleChange = (key: keyof T, value: any) => {
        setValues({ ...values, [key]: value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
        >
            {Object.keys(values).map((key) => (
                <div key={key}>
                    <label>{key}</label>
                    <input
                        value={values[key as keyof T] ?? ''}
                        onChange={(e) => handleChange(key as keyof T, e.target.value)}
                    />
                </div>
            ))}
            <button type="submit">Save</button>
        </form>
    );
}
