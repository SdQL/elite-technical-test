export const successResponse = (data: any) => {
    return {
        success: true,
        data,
    }
}

export const errorResponse = (error: string, details?: any) => {
    return {
        success: false,
        error,
        details: details || null
    }
}