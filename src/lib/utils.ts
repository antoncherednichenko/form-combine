type CLSArgs = string | { [key: string]: boolean } | string[] | undefined

export const cls = function (...args: CLSArgs[]): string {
    const currentClasses = args.map((c) => {
        if (typeof c === 'string' || Array.isArray(c)) {
            return c
        }
        if (typeof c === 'object') {
            return Object.entries(c)
                .map(([key, value]) => value ? key : null)

        }
        return ''
    })
    return currentClasses.flat().filter(Boolean).join(' ')
}