const CasesFolderIcon = ({ size, color }: any) => {
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
        transform='translate(3 4)'
      >
        <path d='m.5 1.5v9c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-6.00280762c.0007656-1.05436179-.8150774-1.91816512-1.8499357-1.99451426l-.1500643-.00468356-5 .00200544-2-2h-4c-.55228475 0-1 .44771525-1 1z' />
        <path d='m.5 2.5h7' />
      </g>
    </svg>
  )
}

export default CasesFolderIcon
