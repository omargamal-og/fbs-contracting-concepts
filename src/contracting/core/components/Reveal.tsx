import {
  Box,
  type BoxProps,
} from '@mui/material'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

type RevealProps = BoxProps & {
  delay?: number
  distance?: number
}

function Reveal({
  children,
  delay = 0,
  distance = 36,
  sx,
  ...rest
}: RevealProps) {
  const elementRef =
    useRef<HTMLDivElement | null>(null)

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          setVisible(true)
          observer.unobserve(element)
        },
        {
          threshold: 0.14,
        },
      )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Box
      ref={elementRef}
      sx={{
        opacity: visible ? 1 : 0,

        transform: visible
          ? 'translateY(0)'
          : `translateY(${distance}px)`,

        transition: `
          opacity 700ms ease ${delay}ms,
          transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms
        `,

        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
          transform: 'none',
          transition: 'none',
        },

        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Reveal