/**
 * @Project: learning-typescript
 * @Author CHUNAM
 * @Date 11/14/2025
 * @Time 1:04 AM
 */
import { useState } from 'react';

type DynamicFormProps<T extends Record<string, unknown>> = {
    model: T;
    onSubmit: (values: T) => void;
};

export function DynamicForm<T extends Record<string, unknown>>({ model, onSubmit }: DynamicFormProps<T>) {
    const [values, setValues] = useState<T>(model);

    // Type-safe handleChange
    const handleChange = <K extends keyof T>(key: K, value: string | number | boolean) => {
        const originalValue = model[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        let parsedValue: T[K] | string = value;

        if (typeof originalValue === 'number') {
            parsedValue = Number(value) as T[K];
        } else if (typeof originalValue === 'boolean') {
            parsedValue = Boolean(value) as T[K];
        }

        setValues({ ...values, [key]: parsedValue });
    };

    const getInputType = (key: keyof T): 'text' | 'number' | 'checkbox' => {
        const value = model[key];
        switch (typeof value) {
            case 'number':
                return 'number';
            case 'boolean':
                return 'checkbox';
            case 'string':
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
                const typedKey = key as keyof T;
                const inputType = getInputType(typedKey);
                const value = values[typedKey];

                return (
                    <div key={key}>
                        <label>
                            {key}
                            {inputType === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    checked={Boolean(value)}
                                    onChange={(e) => handleChange(typedKey, e.target.checked)}
                                />
                            ) : (
                                <input
                                    type={inputType}
                                    value={inputType === 'number' && value === '' ? '' : (value as string | number)}
                                    onChange={(e) => {
                                        const val = inputType === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value;
                                        handleChange(typedKey, val);
                                    }}
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

