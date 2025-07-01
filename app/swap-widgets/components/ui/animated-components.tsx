import { AnimatePresence, motion } from "framer-motion";

type MotionDivProps = React.ComponentProps<typeof motion.div>;
interface AnimatedDiv extends MotionDivProps {
  condition: boolean;
}
const TranslateY = ({ condition, ...props }: AnimatedDiv) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          {...props}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export { TranslateY };
