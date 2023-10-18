export interface UserData {
    id: number,
    created_at: string,
    name: string,
    email: string,
    birth_date: string,
    passage_user_id: string,
    zodiac_sign: string
}

export interface Insights {
    data: {
        moonPhase: string,
        horoscope: string,
        mood: string,
        exercise: string
    }
}