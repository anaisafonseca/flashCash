export function required(type: any) {
    return { 
        type,
        required: true
     }
}

export function defaultValue(type: any) {
    return { 
        type,
        default: 0.0
     }
}