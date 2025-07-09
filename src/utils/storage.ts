const TASKS_KEY = "haru_tasks"

export function forgetMe () {
    localStorage.removeItem("haru_name")
    localStorage.removeItem(TASKS_KEY)
}

export function saveUserName (name : string) {
    localStorage.setItem("haru_name", name)
}

export function getUserName () {
    return localStorage.getItem("haru_name")
}

export function saveUserTasks(tasks : string[]) {
    const clean = tasks.filter(tasks => tasks.trim() !== "")
    localStorage.setItem(TASKS_KEY, JSON.stringify(clean))
}

export function getUserTasks() {
    const data = localStorage.getItem(TASKS_KEY)
    return data ? JSON.parse(data) : []
}