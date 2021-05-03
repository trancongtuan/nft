import { useEffect, useRef } from 'react'

const useHorizontalScroll = (): React.MutableRefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>(null)
    const isDown = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)
    useEffect(() => {
        const el = ref.current
        if (el) {
            const onWheel: (e: WheelEvent) => void = (e) => {
                if (e.deltaY === 0) return
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: 'smooth',
                })
            }
            const onMouseDown: (e: MouseEvent) => void = (e) => {
                isDown.current = true
                startX.current = e.pageX - el.offsetLeft
                scrollLeft.current = el.scrollLeft
                el.style.cursor = 'pointer'
            }
            const onMouseLeave: () => void = () => {
                isDown.current = false
            }
            const onMouseUp: () => void = () => {
                isDown.current = false
                el.style.cursor = 'default'
            }
            const onMouseMove: (e: MouseEvent) => void = (e) => {
                if (!isDown.current) return
                e.preventDefault()
                const x = e.pageX - el.offsetLeft
                const walk = x - startX.current
                el.scrollLeft = scrollLeft.current - walk
            }
            el.addEventListener('wheel', onWheel)
            el.addEventListener('mousedown', onMouseDown)
            el.addEventListener('mouseleave', onMouseLeave)
            el.addEventListener('mouseup', onMouseUp)
            el.addEventListener('mousemove', onMouseMove)
            return () => {
                el.removeEventListener('wheel', onWheel)
                el.removeEventListener('mousedown', onMouseDown)
                el.removeEventListener('mouseleave', onMouseLeave)
                el.removeEventListener('mouseup', onMouseUp)
                el.removeEventListener('mousemove', onMouseMove)
            }
        }
        return null
    }, [])
    return ref
}
export default useHorizontalScroll
