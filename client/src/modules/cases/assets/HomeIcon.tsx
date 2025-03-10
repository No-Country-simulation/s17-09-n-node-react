const HomeIcon = ({ size, color }: any) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox='0 0 21 21'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        fill='none'
        fill-rule='evenodd'
        stroke={color}
        stroke-linecap='round'
        stroke-linejoin='round'
        transform='translate(1 1)'
      >
        <path d='m.5 9.5 9-9 9 9' />
        <path d='m2.5 7.5v8c0 .5522847.44771525 1 1 1h3c.55228475 0 1-.4477153 1-1v-4c0-.5522847.44771525-1 1-1h2c.5522847 0 1 .4477153 1 1v4c0 .5522847.4477153 1 1 1h3c.5522847 0 1-.4477153 1-1v-8' />
      </g>
    </svg>
  )
}

export default HomeIcon
