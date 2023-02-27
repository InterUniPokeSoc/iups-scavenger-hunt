export enum LocalProperty {
    SELECTED_HUNT = "current_hunt",
    SELECTED_HINT = "current_hint",
}

export class Local {
    static setProperty(property: LocalProperty, newValue: any) {
        localStorage.setItem(property, newValue)
    }

    static getProperty(property: LocalProperty): any {
        return localStorage.getItem(property)
    }
}