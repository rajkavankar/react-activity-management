import React from "react"

const Flex = ({ children, justify, align }) => {
  return (
    <div
      className={`d-flex ${
        justify === "center"
          ? "justify-content-center"
          : justify === "between"
          ? "justify-content-between"
          : justify === "start"
          ? "justify-content-start"
          : justify === "end"
          ? "justify-content-end"
          : justify === "around" && "justify-content-around"
      } ${
        align === "center"
          ? "align-items-center"
          : align === "between"
          ? "align-items-between"
          : align === "start"
          ? "align-items-start"
          : align === "end"
          ? "align-items-end"
          : align === "around" && "align-items-around"
      }`}>
      {children}
    </div>
  )
}

Flex.defaultProps = {
  justify: "center",
  align: "center",
}

export default Flex
