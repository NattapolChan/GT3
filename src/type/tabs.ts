// export type Enumerate<
//   N extends number,
//   Acc extends number[] = []
// > = Acc['length'] extends N
//   ? Acc[number]
//   : Enumerate<N, [...Acc, Acc['length']]>

// export type IntRange<F extends number, T extends number> = Exclude<
//   Enumerate<T>,
//   Enumerate<F>
// >

// export type fretRange = IntRange<-1, 20>

export type fretRange = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

export type EachBarProps = {
  noteBarList: Array<Array<number>>
  isFirst: boolean
  datatabs: songObjectType
  setDatatabs: Function
  barnumber: number
  barInClipboard: Array<Array<number>>
  setBarInClipboard: Function
}

export type EachTabProps = {
  noteStringList: Array<string>
  isFirst: boolean
  time: number
}

export type eachTabType = Array<Array<Array<fretRange>>>

export type songObjectType = {
  bpm: number
  timeSig: Array<number>
  stringTune: [string, string, string, string, string, string]
  tab: eachTabType
}

export type Values = {
  note: fretRange
}
