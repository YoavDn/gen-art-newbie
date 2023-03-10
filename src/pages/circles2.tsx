import { startTransition, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import {
  deg2Rad,
  initCanvas,
  polar2cart,
  r180,
  r90,
  range,
  shuffle,
} from '../utils'

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never

const colorSchemes = [
  ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#F5F5EB'],
  ['#0F4155', '#288791', '#7ec873', '#F04132', '#fcf068'],
  ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
]

let theme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
let clrQueue = [...new Array(theme.length)].map((_, i) => i)

const f = {
  start: () => {},
}

function Circles2() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const patterns = ['p1', 'p2', 'p3', 'p4'] as const

  const [pattern, setPattern] = useState<ArrElement<typeof patterns>>('p2')

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    const blockSize = 400 / 8

    f.start = () => {
      theme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
      draw()
    }

    function grain() {
      ctx.save()
      //making the texture
      for (let i = 0; i < width - 1; i += 2) {
        for (let j = 0; j < height - 1; j += 2) {
          const grey = Math.floor(range(205 - 40, 205 + 30))
          ctx.fillStyle = 'rgba(' + grey + ',' + grey + ',' + grey + ', .1)'
          rect(i, j, 2, 2)
        }
      }
      //making some gray darker dots
      for (let i = 0; i < 30; i++) {
        const grey = Math.floor(range(130, 215))
        const opacity = (range(100, 170) / 255).toFixed(2)
        ctx.fillStyle =
          'rgba(' + grey + ',' + grey + ',' + grey + ', ' + opacity + ')'
        rect(
          range(0, width - 2),
          range(0, height - 2),
          range(1, 3),
          range(1, 3)
        )
      }

      ctx.restore()
    }
    const draw = () => {
      for (let i = blockSize / 2; i < 400; i += blockSize) {
        for (let j = blockSize / 2; j < 400; j += blockSize) {
          clrQueue = shuffle([0, 1, 2, 3, 4])
          ctx.fillStyle = theme[clrQueue[0]]
          rect(j, i, blockSize, blockSize)
          ctx.save()

          ctx.translate(j, i)
          if (pattern === 'p1') {
            p1(0, 0)
          } else if (pattern === 'p2') {
            p2(0, 0)
          } else if (pattern === 'p3') {
            p3(0, 0)
          } else if (pattern === 'p4') {
            p4(0, 0)
          }

          ctx.restore()
        }
      }
      grain()
    }

    // patterns
    function p1(x: number, y: number) {
      ctx.rotate(deg2Rad(90 * Math.round(range(1, 5))))
      ctx.fillStyle = theme[clrQueue[1]]
      arc(x - blockSize / 2, y, blockSize, deg2Rad(270), deg2Rad(450))
      ctx.fillStyle = theme[clrQueue[2]]
      arc(x + blockSize / 2, y, blockSize, deg2Rad(90), deg2Rad(270))
    }

    function p2(x: number, y: number) {
      ctx.rotate(deg2Rad(90 * Math.round(range(1, 5))))
      ctx.fillStyle = theme[clrQueue[1]]
      arc(x - blockSize / 2, y, blockSize, deg2Rad(270), deg2Rad(450))
    }

    function p3(x: number, y: number) {
      if (Math.random() > 0.4) {
        ctx.fillStyle = theme[clrQueue[1]]
        arc(x, y + blockSize / 2, blockSize, deg2Rad(270), deg2Rad(450))
        ctx.fillStyle = theme[clrQueue[2]]
      }
    }
    function p4(x: number, y: number) {
      ctx.rotate(deg2Rad(90 * Math.round(range(1, 5))))
      ctx.fillStyle = theme[clrQueue[1]]
      arc(x - blockSize / 2, y, blockSize, deg2Rad(270), deg2Rad(450))
      ctx.fillStyle = theme[clrQueue[2]]
      arc(x + blockSize / 2, y, blockSize, deg2Rad(90), deg2Rad(270))

      ctx.fillStyle = theme[clrQueue[1]]
      arc(x, y + blockSize / 2, blockSize, deg2Rad(180), deg2Rad(360))
      ctx.fillStyle = theme[clrQueue[2]]
      arc(x, y - blockSize / 2, blockSize, deg2Rad(0), deg2Rad(180))
    }

    //helpers
    function rect(x: number, y: number, w: number, h: number) {
      ctx.fillRect(x - w / 2, y - h / 2, w, h)
    }

    function arc(
      x: number,
      y: number,
      w: number,
      startAng: number,
      endAng: number,
      isStroke = false
    ) {
      ctx.beginPath()
      ctx.arc(x, y, w / 2, startAng, endAng)
      ctx.fill()
      if (isStroke) {
        ctx.stroke()
      }
    }

    f.start()
  }, [pattern])
  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <canvas
            className="canvas"
            onClick={() => f.start()}
            ref={el}
          ></canvas>
          <div className="flex gap-2 pt-4 text-gray-400 items-center font-mono py-2 ">
            {patterns.map(p => (
              <button
                onClick={() => setPattern(p)}
                key={p}
                className={`${
                  p === pattern ? 'text-gray-600' : ''
                } hover:text-gray-600`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Circles2
