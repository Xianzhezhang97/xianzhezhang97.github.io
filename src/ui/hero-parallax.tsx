/** @format */

'use client';
import React from 'react';
import TextAnimate from './TextAnimate';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { useLanguage } from '../help/helpFunction';

// Define the type for the items to be displayed
interface ItemType {
  title: string;
  link: string;
  thumbnail: string;
}

// HeroParallax component with items as props
export const HeroParallax = ({ Items }: { Items: ItemType[] }) => {
  if (!Items || Items.length === 0) {
    return (
      <div className='flex items-center justify-center text-5xl'>
        No items to display
      </div>
    );
  }

  // Split the items into rows for display
  const rows = [
    Items.slice(0, 10),
    Items.slice(5, 15),
    Items.slice(15, 25),
    Items.slice(0, 10),
    Items.slice(5, 15),
    Items.slice(15, 25),
    Items.slice(0, 10),
    Items.slice(5, 15),
    Items.slice(15, 25),
    Items.slice(0, 10),
    Items.slice(5, 15),
    Items.slice(15, 25),
  ];

  // Set up the scroll animation
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Create various animated values
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 1], [0, 100, 0]),
    springConfig,
  );
  const borderRadius = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 28]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 1], [0, -100, 0]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.5, 0.9]),
    springConfig,
  );
  const opacitySpan = useSpring(
    useTransform(scrollYProgress, [0, 0.05], [1, 0]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 1], [-1000, 1000, 1500]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className='h-[300vh] relative overflow-hidden antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]'
    >
      <Header />
      <span className='absolute w-full flex h-full bg-gradient-to-b from-[0%] to-[90%] from-black via-[30%] via-black/50 to-transparent'></span>
      <motion.span
        style={{ opacity: opacitySpan }}
        className='absolute w-[100vw] h-full z-10 bg-gradient-to-tr from-[0%] to-[100%] from-black via-[40%] via-black to-transparent'
      ></motion.span>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className='flex flex-col gap-10'
      >
        {rows.map((row, index) => (
          <motion.div
            key={index}
            className={`flex ${index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : 'flex-row'} gap-10`}
          >
            {row.map((Item) => (
              <ProductCard
                Item={Item}
                translate={index % 2 === 0 ? translateX : translateXReverse}
                borderRadius={borderRadius}
                key={Item.title}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Header component
export const Header = () => {
  const lang: any = useLanguage();
  return (
    <div className='absolute top-[30vh] left-[1vw] lg:left-[15vw] w-full px-4  max-w-7xl '>
      <script src='https://cdn.tailwindcss.com'></script>
      <div className='relative flex flex-col gap-0'>
        <TextAnimate
          duration={-3}
          delay={-0.5}
          className='flex w-full z-20 text-[50px] md:text-[80px] lg:text-[100px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-100 font-[700]'
          text={['My Projects', '我的项目'][lang]}
          type='fadeIn'
        />
        <p className='relative z-20 max-w-5xl mt-8 text-[20px]  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-100 '>
          {
            [
              "Welcome to my world, a dream woven with code and creativity. Every line of code, every click, shines like a star, illuminating the future we explore together. May this romance touch the softest corner of your heart, and together, let's find that unique emotion in the digital sea.",
              '欢迎来到我的世界，这里是我用代码和创意编织的梦想。每一行代码，每一次点击，都如同星光闪烁，照亮我们共同探索的未来。愿这份浪漫，能触动你心中最柔软的角落，与我一同，在数字的海洋里，寻找那份独一无二的感动。',
            ][lang]
          }
        </p>
      </div>
    </div>
  );
};

// ProductCard component
export const ProductCard = ({
  Item,
  translate,
  borderRadius,
}: {
  Item: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  borderRadius: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
        borderRadius,
      }}
      whileHover={{
        y: -5,
      }}
      key={Item.title}
      transition={{ duration: 0.3 }}
      className='group/Item h-96 w-[30rem] relative flex-shrink-0 overflow-hidden'
    >
      <a
        href={Item.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block group-hover/Item:shadow-2xl'
      >
        <img
          loading='lazy'
          src={Item.thumbnail}
          height='600'
          width='600'
          className='absolute inset-0 object-cover object-left-top w-full h-full'
          alt={Item.title}
        />
      </a>
      <div className='absolute inset-0 w-full h-full opacity-0 pointer-events-none bg-gradient-to-t from-black to-transparent group-hover/Item:opacity-80'></div>
      <h2 className='absolute text-white opacity-0 bottom-[28px] text-[20px] left-[28px] group-hover/Item:opacity-100'>
        {Item.title}
      </h2>
    </motion.div>
  );
};
