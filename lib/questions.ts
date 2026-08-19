import { NO_ANSWER, YES_ANSWER, type Question } from "./types";

const YES_NO_OPTIONS = [YES_ANSWER, NO_ANSWER];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    gutType: "下がり腸",
    text: "おへその下が出ている",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q2",
    gutType: "下がり腸",
    text: "姿勢が悪い",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q3",
    gutType: "下がり腸",
    text: "寝ても脚のむくみが中々取れない",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q4",
    gutType: "冷え腸",
    text: "おへその周りが冷えている",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q5",
    gutType: "冷え腸",
    text: "生理不順や生理痛がある",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q6",
    gutType: "冷え腸",
    text: "腰やお尻が普段から冷たい",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q7",
    gutType: "冷え腸",
    text: "冷たい物やカフェインをよく摂る",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q8",
    gutType: "むくみ腸",
    text: "全身のむくみを感じる",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q9",
    gutType: "むくみ腸",
    text: "濃い味付けを好む",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q10",
    gutType: "むくみ腸",
    text: "入浴は週に3回以下",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q11",
    gutType: "たまり腸",
    text: "日頃の排便は3日に一度程度",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q12",
    gutType: "たまり腸",
    text: "トイレを我慢することが多い",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q13",
    gutType: "たまり腸",
    text: "水分をあまり摂らない",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q14",
    gutType: "たまり腸",
    text: "毎食、食物繊維のある食事を摂らない",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q15",
    gutType: "ガス腸",
    text: "お腹が張って苦しい時がある",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q16",
    gutType: "ガス腸",
    text: "食べるのが早い",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q17",
    gutType: "ガス腸",
    text: "お肉をよく食べる",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q18",
    gutType: "ストレス腸",
    text: "ストレスを感じることが多い",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q19",
    gutType: "ストレス腸",
    text: "下痢と便秘を繰り返す",
    options: YES_NO_OPTIONS,
  },
  {
    id: "q20",
    gutType: "ストレス腸",
    text: "眠りが浅いと感じる",
    options: YES_NO_OPTIONS,
  },
];
