/**
 * @Project: learning-typescript
 * @Author CHUNAM
 * @Date 11/14/2025
 * @Time 1:04 AM
 */
import {useState} from 'react';

type DynamicFormProps<T> = {
    model: T;
    onSubmit: (values: T) => void;
};

// @typescript-eslint/no-explicit-any
export function DynamicForm<T extends Record<string, never>>({model, onSubmit}: DynamicFormProps<T>) {
    const [values, setValues] = useState<T>(model);

// @typescript-eslint/no-explicit-any
    const handleChange = (key: keyof T, value: never) => {
        // convert value nếu kiểu là number
        const originalValue = model[key];
        // @typescript-eslint/no-explicit-any
        let parsedValue: string | number = value;
        if (typeof originalValue === 'number') {
            parsedValue = value === '' ? '' : Number(value);
        }
        setValues({...values, [key]: parsedValue});
    };

    const getInputType = (key: keyof T) => {
        const value = model[key];
        switch (typeof value) {
            case 'number':
                return 'number';
            case 'string':
                return 'text';
            case 'boolean':
                return 'checkbox';
            default:
                return 'text';
        }
    };


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
        >
            {Object.keys(values).map((key) => {
                const inputType = getInputType(key as keyof T);
                const value = values[key as keyof T];

                return (
                    <div key={key}>
                        <label>
                            {key}
                            {inputType === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    checked={!!value}
                                    onChange={(e) => handleChange(key as keyof T, e.target.checked)}
                                />
                            ) : (
                                <input
                                    type={inputType}
                                    value={inputType === 'number' && value === '' ? '' : value}
                                    onChange={(e) => handleChange(key as keyof T, e.target.value)}
                                />
                            )}
                        </label>
                    </div>
                );
            })}
            <button type="submit">Save</button>
        </form>
    );
}

