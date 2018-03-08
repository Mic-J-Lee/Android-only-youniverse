export const firstHello(ivansName = 'Ivan') = {
  speech: 'Hi, my name is ' + ivansName,
  location: null
}

export const niceToMeetYou(userName) = {
  speech: 'Nice to meet you, ' + userName,
  location: null
}

export const intro = [
  firstHello,
  niceToMeetYou
]
