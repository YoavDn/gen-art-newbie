import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { initCanvas, r180, r360 } from '../utils'

type PointType = { x: number; y: number }
type LineType = PointType[]

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  [p1, p2, p3]: PointType[]
) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.lineTo(p3.x, p3.y)
  ctx.lineTo(p1.x, p1.y)
  ctx.closePath()
  ctx.stroke()
}

function draw(
  ctx: CanvasRenderingContext2D,
  size: number,
  w: number,
  h: number
) {
  const lines: LineType[] = []
  let odd = false
  for (let i = size / 2; i <= w; i += size) {
    const line: PointType[] = []
    odd = !odd

    for (let j = size / 2; j <= w; j += size) {
      const dot: PointType = { x: j + (odd ? size / 2 : 0), y: i }
      line.push(dot)

      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 1, 0, r360, true)
      ctx.fill()
    }
    lines.push(line)
  }

  let dotLine
  odd = true

  for (let y = 0; y < lines.length - 1; y++) {
    odd = !odd
    dotLine = []
    for (let i = 0; i < lines[y].length; i++) {
      dotLine.push(odd ? lines[y][i] : lines[y + 1][i])
      dotLine.push(odd ? lines[y + 1][i] : lines[y][i])
    }
    for (let i = 0; i < dotLine.length - 2; i++) {
      drawTriangle(ctx, [dotLine[i], dotLine[i + 1], dotLine[i + 2]])
    }
  }
}
export default function () {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    draw(ctx, width / 7, width, height)
  }, [])
  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <canvas className="canvas" ref={el}></canvas>
        </div>
      </main>
    </>
  )
}