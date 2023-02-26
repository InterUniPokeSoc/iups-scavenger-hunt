export enum LocalProperty {
    SELECTED_HUNT = "current_hunt",
    SELECTED_HINT = "current_hint",
}

export class Local {
    static setProperty(property: LocalProperty, newValue: any) {
        console.log("SET PROPERTY: "+property+" TO: "+newValue)
        localStorage.setItem(property, newValue)
    }

    static getProperty(property: LocalProperty): any {
        console.log("GET PROPERTY: "+property+" IS: "+localStorage.getItem(property))
        return localStorage.getItem(property)
    }
}