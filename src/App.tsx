import "./styles.css";
import { useEffect } from "react";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";

const squareVariants = {
  visible: { opacity: 1, scale: 2, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0, transition: { duration: 1 } },
};

function Trigger(props: { controls: AnimationControls }) {
  const { controls } = props;
  const [ref, inView, entry] = useInView();
  const topDistance = entry?.boundingClientRect.top as number;
  useEffect(() => {
    if (topDistance > 0) {
      if (inView) {
        controls.start("visible");
      } else if (!inView) {
        controls.start("hidden");
      }
    }
  }, [controls, inView]);
  return <div ref={ref} style={{ marginTop: "100vh" }}></div>;
}

function FixedSquare(props: {
  controls: AnimationControls;
  pos: {};
  children: string;
}) {
  const { controls, pos, children } = props;
  return (
    <motion.div
      variants={squareVariants}
      animate={controls}
      initial="hidden"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "white",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...pos,
      }}
    >
      {children}
    </motion.div>
  );
}

const CORNER_DISTANCE = "100px";
export default function App() {
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();
  const control4 = useAnimation();
  return (
    <div className="App">
      <motion.h1
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          loop: Infinity,
        }}
        className="title"
      >
        Scroll Down
      </motion.h1>
      <Trigger controls={control1} />
      <Trigger controls={control2} />
      <Trigger controls={control3} />
      <Trigger controls={control4} />
      <FixedSquare
        controls={control1}
        pos={{ top: CORNER_DISTANCE, left: CORNER_DISTANCE }}
      >
        1
      </FixedSquare>
      <FixedSquare
        controls={control2}
        pos={{ top: CORNER_DISTANCE, right: CORNER_DISTANCE }}
      >
        2
      </FixedSquare>
      <FixedSquare
        controls={control3}
        pos={{ bottom: CORNER_DISTANCE, left: CORNER_DISTANCE }}
      >
        3
      </FixedSquare>
      <FixedSquare
        controls={control4}
        pos={{ bottom: CORNER_DISTANCE, right: CORNER_DISTANCE }}
      >
        4
      </FixedSquare>
    </div>
  );
}
