import { useState } from 'react'
import { Popper } from 'react-popper'

const HoverCard = ({ content, children }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <Popper>
      {({ ref, style, placement }) => (
        <>
          <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
          {isOpen && (
            <div
              className="bg-red-500"
              ref={ref}
              style={style}
              data-placement={placement}
            >
              {content}
            </div>
          )}
        </>
      )}
    </Popper>
  )
}

export default HoverCard
