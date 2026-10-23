import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./TiltedCard.css";

export default function TiltedCard({
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "560px",
  containerWidth = "100%",
  imageHeight = "560px",
  imageWidth = "100%",
  rotateAmplitude = 10,
  scaleOnHover = 1.04,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent = null,
}) {
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 260, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 28 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  function handlePointerMove(event) {
    if (event.pointerType === "touch") {
      setIsTouchDevice(true);
      return;
    }

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(pointerX);
    y.set(pointerY);
  }

  function handlePointerEnter(event) {
    if (event.pointerType === "touch") {
      setIsTouchDevice(true);
      return;
    }

    setIsHovering(true);
  }

  function handlePointerLeave() {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className="tilted-card"
      style={{ "--tilted-card-height": containerHeight, "--tilted-card-width": containerWidth }}
    >
      {showMobileWarning && isTouchDevice && <div className="tilted-card-mobile-warning">Tilt disabled on touch devices</div>}

      <motion.figure
        ref={cardRef}
        className="tilted-card-figure"
        style={{
          rotateX,
          rotateY,
          scale: isHovering ? scaleOnHover : 1,
          transformPerspective: 900,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-image"
          style={{ height: imageHeight, width: imageWidth }}
          draggable="false"
        />

        <div className="tilted-card-gradient" />
        <div className="tilted-card-glow" />
        {displayOverlayContent && overlayContent}

        {showTooltip && captionText && <figcaption className="tilted-card-caption">{captionText}</figcaption>}
      </motion.figure>
    </div>
  );
}
