import { duration } from '../src/duration-format'

// $N means Nth parameter
describe('Time duration to format', () => {
  describe('milliseconds', () => {
    it('HH:mm:ss when $1 = 999', () => {
      const formattedDurationTime = duration(999, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:00')
    })

    it('HH:mm:ss when $1 = 1000', () => {
      const formattedDurationTime = duration(1000, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:01')
    })

    it('HH:mm:ss when $1 = 222222', () => {
      const formattedDurationTime = duration(222222, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:03:42')
    })

    it('HH:mm:ss when $1 = 2222', () => {
      const formattedDurationTime = duration(2222, 'milliseconds').format('HH:mm:ss:SSS')
      expect(formattedDurationTime).toEqual('00:00:02:222')
    })

    it('HH:mm:ss when $1 = 273222222', () => {
      const formattedDurationTime = duration(273222222, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('75:53:42')
    })

    it('HH,mm[[H]]ss when $1 = 12732222', () => {
      const formattedDurationTime = duration(12732222, 'milliseconds').format('HH,mm[[H]]ss')
      expect(formattedDurationTime).toEqual('03,32[H]12')
    })

    it('HH:mm:ss when $1 = -1000', () => {
      const formattedDurationTime = duration(-1000, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:00')
    })

    it('HH:mm:ss when $1 = -12732222', () => {
      const formattedDurationTime = duration(-12732222, 'milliseconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:00')
    })
  })

  describe('seconds', () => {
    it('HH:mm:ss when $1 = 1', () => {
      const formattedDurationTime = duration(1, 'seconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:01')
    })

    it('HH:mm:ss when $1 = 1000', () => {
      const formattedDurationTime = duration(1000, 'seconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:16:40')
    })

    it('HH:mm:ss when $1 = 7380', () => {
      const formattedDurationTime = duration(7380, 'seconds').format('H:mm')
      expect(formattedDurationTime).toEqual('2:03')
    })

    it('HH:mm:ss when $1 = -1', () => {
      const formattedDurationTime = duration(-1, 'seconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:00')
    })

    it('HH:mm:ss when $1 = -12732222', () => {
      const formattedDurationTime = duration(-12732222, 'seconds').format('HH:mm:ss')
      expect(formattedDurationTime).toEqual('00:00:00')
    })

    it('HH:mm:ss when $1 = 3661', () => {
      const formattedDurationTime = duration(3661, 'seconds').format('H [hrs], m [mins]')
      expect(formattedDurationTime).toEqual('1 hrs, 1 mins')
    })
  })
})
