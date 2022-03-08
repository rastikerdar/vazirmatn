import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

export const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
