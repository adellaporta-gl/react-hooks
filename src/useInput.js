import { useState } from "react";

export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    return [
        // soundInput / colorInput
        {
            value,
            onChange: (syntheticEvent) => { setValue(syntheticEvent.target.value) }
        },
        // resetSoundInput / resetColorInput
        () => setValue(initialValue)
    ];
}