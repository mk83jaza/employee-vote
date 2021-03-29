import { createI18n } from 'vue-i18n'

const messages = {
    'en': {
        vote: 'Vote',
        statistics: 'Statistics',
        voteQuestion: 'How was your week?',
        submit: 'Submit',
        voteSuccessMessage: 'Successfully voted, thank you! :)',
        voteFailureMessage: 'An error occurred, your vote was not submitted!',
        apiFailureMessage: 'An error occurred, data can\'t be loaded!',
        refresh: 'Refresh',
        chooseYear: 'Choose Year',
        chooseWeek: 'Choose Week',
        ratingPerWeek: 'Average Rating per calendar Week',
        annualAverage: 'Annual Average',
        weeklyAverage: 'Weekly Average',
        numberOfVotesThisWeek: 'Number of votes this week',
        votesFromTo: 'Votes: {from} - {to}',
    },
    'de': {
        vote: 'Abstimmen',
        statistics: 'Statistiken',
        voteQuestion: 'Wie war deine Woche?',
        submit: 'Senden',
        voteSuccessMessage: 'Erfolgreich abgestimmt, vielen Dank! :)',
        voteFailureMessage: 'Ein Fehler ist aufgetreten, deine Abstimmung wurde nicht gespeichert!',
        apiFailureMessage: 'Ein Fehler ist aufgetreten, Daten können nicht geladen werden!',
        refresh: 'Aktualisieren',
        chooseYear: 'Jahr auswählen',
        chooseWeek: 'Woche auswählen',
        ratingPerWeek: 'Durchschnittliche Bewertung pro KW',
        annualAverage: 'Jahresdurchschnitt',
        weeklyAverage: 'Wochendurchschnitt',
        numberOfVotesThisWeek: 'Anzahl der Stimmen in dieser Woche',
        votesFromTo: 'Stimmen: {from} - {to}',
    }
}

function browserLocale() {
    return navigator.language.split('-')[0];
}

const i18n = createI18n({
    locale: browserLocale(),
    fallbackLocale: 'en',
    messages
})

export default i18n;