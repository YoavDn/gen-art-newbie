import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRef, useEffect } from 'react'
import { initCanvas } from '../utils'
const { random } = Math

function draw(
  ctx: CanvasRenderingContext2D,
  step: number,
  w: number,
  h: number
) {
  const lines = []

  //   ctx.lineWidth = 2

  for (let i = step; i <= 400 - step; i += step) {
    const line: { x: number; y: number }[] = []
    for (let j = step; j <= 400 - step; j += step) {
      const distanceToCenter = Math.abs(j - 400 / 2)
      const variance = Math.max(400 / 2 - 50 - distanceToCenter, 0)
      const dif = (random() * variance) / (2 * -1)
      line.push({ x: j, y: i + dif })
    }
    lines.push(line)
  }

  //do the drawing

  for (let i = 5; i < lines.length; i++) {
    ctx.beginPath()
    ctx.moveTo(lines[i][0].x, lines[i][0].y)

    let j = 0
    for (j = 0; j < lines[i].length - 2; j++) {
      // calculating the line middle point and adding control point
      const xc = (lines[i][j].x + lines[i][j + 1].x) / 2
      const yc = (lines[i][j].y + lines[i][j + 1].y) / 2
      ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc)
    }
    ctx.quadraticCurveTo(
      lines[i][j].x,
      lines[i][j].y,
      lines[i][j + 1].x,
      lines[i][j + 1].y
    )
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fill()
    ctx.restore()
    ctx.stroke()
  }
}

function JoyDivision() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    draw(ctx, 10, width, height)
  }, [])

  return (
    <>
      <div className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <main className="centered">
          <canvas className="canvas" ref={el}></canvas>
        </main>
      </div>
    </>
  )
}
export default JoyDivision
