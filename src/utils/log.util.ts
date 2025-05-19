export function log(message: string, context: string = "ENGINE") {
    console.log(`[${context}] ${message}`);
}

export function errorLog(message: string, context: string = "ENGINE") {
    console.error(`[${context}] ❌ ${message}`);
}
