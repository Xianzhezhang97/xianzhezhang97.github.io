/** @format */

import React, { useState, useEffect, useRef } from 'react';
import TextAnimate from '../ui/TextAnimate.tsx';
import Database from '../data/Database.json';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  easeInOut,
  LazyMotion,
} from 'framer-motion';
import { useLanguage } from '../help/helpFunction';
const data = Database.PersonalInfo.SelfDescribing;
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('复制成功');
  } catch (err) {
    // fallback 方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('复制成功 (fallback)');
    } catch (error) {
      console.error('复制失败', error);
    }
    document.body.removeChild(textarea);
  }
};
function SelfDescribing() {
  const lang = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  useEffect(() => {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.overflow = 'scroll';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    setScrollbarWidth(scrollbarWidth);
  }, []);
  const viewwidth = window.innerWidth - scrollbarWidth;

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod'];

    if (mobileKeywords.some((keyword) => userAgent.includes(keyword))) {
      setIsMobile(true);
    }
  }, []);

  const parseText = (text) => {
    const parts = text
      .split(/({bold}.*?{bold}|{a}.*?{a}|{copy}.*?{copy})/)
      .map((part, index) => {
        if (part.startsWith('{bold}') && part.endsWith('{bold}')) {
          return (
            <span
              key={`bold-${index}`}
              className='text-white mx-[3px] font-[600] text-[15px] md:text-[20px] lg:text-[22px]'
            >
              {part.replace(/{bold}/g, '')}
            </span>
          );
        }

        if (part.startsWith('{a}') && part.endsWith('{a}')) {
          const link = part.replace(/{a}/g, '');
          return (
            <a
              key={`link-${index}`}
              href={link}
              target='_blank' // To open in a new tab, if desired
              rel='noopener noreferrer' // For security best practices
              className='text-sky-300 mx-[3px] my-[5px] font-[600] border py-[5px] rounded-full text-[10px] px-[30px] md:text-[20px] lg:text-[22px]'
            >
              LINK
            </a>
          );
        }
        if (part.startsWith('{copy}') && part.endsWith('{copy}')) {
          const context = part.replace(/{copy}/g, '');
          return (
            <button
              key={`copy-${index}11`}
              onClick={() => copyToClipboard(context)}
              className='text-sky-300 mx-[3px] my-[5px] font-[600] border py-[5px] rounded-full text-[10px] px-[30px] md:text-[20px] lg:text-[22px]'
            >
              Copy
            </button>
          );
        }

        return (
          <span
            key={`text-${index}`}
            className='text-white/70 text-[13px] font-[500] md:text-[18px] lg:text-[20px]'
          >
            {part}
          </span>
        );
      });

    return parts;
  };

  const ref1 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ['0vh', '80vh', '280vh', '360vh'], // 调整偏移量使滚动效果更平缓
  });

  // 根据滚动进度计算位移
  const x = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ['20vw', '0vw', '0vw', '20vw'],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1.3, 1],
    ['15vh', '10vh', '0vh', '-90vw', '-145vh'],
  );
  const width = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [
      `${viewwidth * 0.5}px`,
      `${viewwidth}px`,
      `${viewwidth}px`,
      `${viewwidth * 0.5}px`,
    ],
  );
  const target = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ['50vw', '0vw', '0vw', '50vw'],
  );
  const borderBottomRightRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [200, 0, 0, 200],
  );
  const borderTopRightRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [200, 0, 0, 200],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0, 1, 0.8, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.5, 1, 1, 0.5],
  );
  if (isMobile) {
    return (
      <motion.blockquote
        style={{
          backgroundImage: `url(${data.pic})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className='relative flex flex-col items-center justify-center w-full px-[20px] py-[10vw] bg-black'
      >
        <motion.span className='absolute z-0 w-full h-full bg-black/75'></motion.span>

        <motion.div className='flex items-center justify-center gap-x-[20px] text-white z-10'>
          <motion.i
            id='AboutMe'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center text-5xl fi lg:text-6xl xl:text-8xl fi-rr-comment-heart`}
          ></motion.i>

          <TextAnimate
            transition={{ duration: 0.3 }}
            className='flex items-center font-mono text-5xl italic font-black tracking-widest uppercase text-nowrap lg:text-6xl xl:text-8xl'
            text={lang === 0 || '0' ? 'About me' : '自述'}
            type='fadeIn'
          />
        </motion.div>

        <iframe
          width='100%'
          height='300px'
          src='https://www.youtube.com/embed/Cll-4cW1UdA?si=XEiP7HgYLe-GCPwy'
          title='YouTube video player'
          frameborder='0'
          className='my-[20px] z-10 rounded-[14px] flex'
          // allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>

        <div className='z-10 mt-[0px] text-left text-white/75'>
          {data.description[lang].map((item, index) => (
            <div key={index} className='mb-[30px]'>
              {index === 3 && (
                <img
                  loading='lazy'
                  className='rounded-full float-right z-10  w-[100px] h-[100px] mb-[10vw]'
                  src={Database.PersonalInfo.Avatar[0]}
                />
              )}
              {parseText(item)}
            </div>
          ))}
        </div>
      </motion.blockquote>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={ref1}
        className=' lg:h-[360vh]  w-full flex flex-col overflow-y-scrollW'
      >
        <motion.div
          style={{
            backgroundImage: `url(${data.pic})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: width,
            borderTopRightRadius: borderTopRightRadius,
            borderBottomRightRadius: borderBottomRightRadius,
            y: y,
          }}
          className='sticky top-0 z-20 flex flex-col h-[1520px]  lg:h-[130vh] items-center justify-center w-full'
        >
          <motion.span
            style={{
              borderTopRightRadius: borderTopRightRadius,
              borderBottomRightRadius: borderBottomRightRadius,
              opacity: opacity,
            }}
            className='absolute w-full h-full bg-black/75'
          ></motion.span>

          <div className='z-30 flex flex-col h-full visblecontainer py-auto'>
            <motion.div
              style={{
                opacity: opacity,
                scale: scale,
                y: y,
              }}
              className='z-10 flex items-center mb-12 font-mono font-bold text-white transform-gppuu text-8xl'
            >
              <i
                id='AboutMe'
                className='flex fi fi-rr-comment-heart mr-[20px]'
              ></i>
              <p className='flex'>{lang === 0 || '0' ? 'About me' : '自述'}</p>
            </motion.div>

            <motion.blockquote className='relative text-white'>
              <motion.div
                style={{
                  opacity: opacity,
                  scale: scale,
                  y: y,
                }}
                className='z-40 float-right absolute right-0 transform-gppuu flex flex-col gap-[20px]'
              >
                <iframe
                  width='500px'
                  height='400px'
                  src='https://www.youtube.com/embed/Cll-4cW1UdA?si=XEiP7HgYLe-GCPwy'
                  title='YouTube video player'
                  frameborder='0'
                  className='my-[20px] ml-[40px] rounded-[28px] flex'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </motion.div>
              <motion.div
                style={{
                  opacity: opacity,
                  scale: scale,
                  y: y,
                }}
                className='z-40 float-right  invisible transform-gppuu flex flex-col gap-[20px]'
              >
                <div className='w-[500px] h-[400px] my-[20px] ml-[40px] rounded-[28px] flex'></div>
              </motion.div>

              <motion.div
                style={{
                  opacity: opacity,
                  y: y,
                }}
                className='block -z-10 transform-gppuu'
              >
                {data.description[lang].map((item, index) => (
                  <motion.div className='block mb-[30px] ' key={index + item}>
                    {index === 3 && (
                      <motion.div
                        style={{
                          opacity: opacity,
                          scale: scale,
                        }}
                        className='z-40  float-left transform-gppuu flex flex-col gap-[20px]'
                      >
                        <motion.img
                          loading='lazy'
                          className='rounded-full flex w-[200px] h-[200px] md:w-[250px] md:h-[250px]'
                          src={Database.PersonalInfo.Avatar[0]}
                        ></motion.img>
                      </motion.div>
                    )}
                    <p
                      style={{
                        lineHeight: 1.2353641176,
                        fontWeight: 500,
                        letterSpacing: '-0.022em',
                        fontFamily:
                          'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                      }}
                    >
                      {parseText(item)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.blockquote>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SelfDescribing;
