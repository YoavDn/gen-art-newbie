import { Link } from 'react-router-dom'
import { Note } from '../components/Note'

const links = [
  { url: '/tilling', title: 'Tiles', number: '01' },
  { url: '/dvd', title: 'DVD', number: '02' },
  { url: '/plum', title: "Antfu's plum", number: '03' },
  { url: '/joy-division', title: 'Joy', number: '04' },
  { url: '/cubic-disarray', title: 'Cubic', number: '05' },
  { url: '/triangular-mesh', title: 'Triangular', number: '06' },
  { url: '/circles', title: 'Circles', number: '07' },
  { url: '/random', title: 'Random', number: '08' },
  { url: '/Lines', title: 'Lines', number: '09' },
  { url: '/piet', title: 'Piet', number: '10' },
  { url: '/circles2', title: 'Circles2', number: '11' },
  { url: '/pixelator', title: 'Pixelator', number: '12' },
  { url: '/lines2', title: 'Lines2', number: '13' },
  { url: '/rectangles', title: 'Rectangles', number: '14' },
  { url: '/sineWave', title: 'Sine Wave', number: '15' },
]

function App() {
  return (
    <>
      <Note>
        <p>
          This Site is inspired by Tim Holman's killer JS Conf talk
          <span className="italic"> "Generative Art Speedrun" </span>
          You should Check it out
        </p>
        <div className="flex gap-6 text-md font-thin">
          <a
            className="text-gray-400 hover:text-gray-800 duration-150 ease"
            href="https://www.youtube.com/watch?v=pvZiB7NkT8M&t=9078s"
          >
            Tim's Talk
          </a>
          <a
            className="text-gray-400 hover:text-gray-800 duration-150 ease"
            href="https://github.com/YoavDn/gen-art-newbie"
          >
            Project source
          </a>
        </div>
      </Note>
      <div className="page">
        <div className="index-page centered">
          <h1 className="font-mono text-gray-800 font-bold mb-6 text-lg ">
            Generative Art Newbie
          </h1>
          <pre className="grid gap-y-1 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(link => (
              <li
                key={link.number}
                className="text-gray-400  block mr-4 list-none hover:text-gray-700 duration-150 ease-in-out group/link"
              >
                <Link to={link.url}>
                  <span className="text-gray-300 group-hover/link:text-gray-400 duration-150 ease-in-out mr-2">
                    {link.number}
                  </span>
                  {link.title}
                </Link>
              </li>
            ))}
          </pre>
        </div>
      </div>
    </>
  )
}
export default App
