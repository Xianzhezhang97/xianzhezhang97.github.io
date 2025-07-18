/** @format */

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion'; // 导入 framer-motion
import DockerBar from '../../conponent/DockerBar';
import { useLanguage } from '../../help/helpFunction';
import Navbar from '../../conponent/NavBar/Navbar';
import CV from './CV_HR';
import CVs from './CV_ATS';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

export default function Resume({ print }) {
  const lang = useLanguage();
  const [isATSMode, setIsATSMode] = useState(false);

  const toggleResumeMode = () => {
    setIsATSMode(!isATSMode);
  };

  const resumeRef = useRef(null);

  // 复制简历全文的函数
  const handleCopyResume = () => {
    const resumeText = resumeRef.current.innerText;
    console.log(resumeText);
    navigator.clipboard
      .writeText(resumeText)
      .then(() => {
        alert(
          ['Resume has been copy in your clipboard.', '简历已复制到剪贴板.'][
            lang
          ],
        );
      })
      .catch((err) => {
        console.error('Copy error:', err);
      });
  };

  return (
    <div className='flex flex-col w-screen h-full bg-white md:justify-center'>
      {!print && (
        <div className='fixed top-0 z-50 '>
          <Navbar
            // BG={'bg-sky-50'}
            extra={<></>}
          />
        </div>
      )}
      {!print && <DockerBar />}
      {/* <PDF /> */}
      <div className='flex justify-center w-full h-full '>
        <div
          ref={resumeRef}
          className={
            print ? 'w-full h-full ' : (
              'mt-[120px] pb-[160px] max-w-[1200px] overflow-hidden flex justify-center items-center h-full flex-col'
            )
          }
        >
          <div className='sticky md:relative -top-8 z-0   flex py-[10px] flex-col items-center justify-center lg:mt-12 group overflow-hidden'>
            <div className='flex items-center justify-center gap-8 mt-4 '>
              {/* Download */}
              <motion.a
                href='https://github.com/Xianzhezhang97/download/raw/main/CV%20%7C%20Scott%20Cheung.pdf'
                blank
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='flex text-white bg-sky-800 text-[2em] relative rounded-full px-6 py-3 cursor-pointer'
              >
                {['Download CV', '下载英文简历'][lang]}
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                onClick={toggleResumeMode}
                className='inline-flex items-center justify-between px-1 py-1 overflow-hidden text-sm text-gray-700 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              >
                {/* HR Mode */}
                <span className='text-[2em] relative rounded-full text-white px-6 py-6 cursor-pointer'>
                  {/* 蓝色背景 */}
                  {isATSMode && (
                    <motion.div
                      layoutId='bgbg'
                      className='absolute top-0 bottom-0 left-0 right-0 z-0 rounded-full bg-sky-800'
                    ></motion.div>
                  )}

                  <span
                    className={`relative z-10 ${
                      isATSMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {['ATS Mode', 'ATS 模式'][lang]}
                  </span>
                </span>

                {/* ATS Mode */}
                <span className='text-[2em] relative rounded-full text-black px-6 py-6  cursor-pointer'>
                  {/* 蓝色背景 */}
                  {!isATSMode && (
                    <motion.div
                      layoutId='bgbg'
                      className='absolute top-0 bottom-0 left-0 right-0 z-0 rounded-full bg-sky-800'
                    ></motion.div>
                  )}

                  <span
                    className={`relative z-10 ${
                      !isATSMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {['HR Mode', 'HR 模式'][lang]}
                  </span>
                </span>
              </motion.div>
              {/* 复制按钮 */}
              {isATSMode && (
                <motion.button
                  onClick={handleCopyResume}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='flex text-white bg-sky-800 text-[2em] relative rounded-full px-6 py-3 cursor-pointer'
                >
                  Copy Text
                </motion.button>
              )}
            </div>

            {/* Display a brief introduction of the two resume modes */}
            <motion.p
              layout
              className='text-gray-600 mt-[5px]  md:flex hidden transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:lg:text-[15px]'
            >
              {isATSMode ?
                [
                  'ATS mode is simplified for easy parsing by automated systems. You can copy and paste the text into an ATS system directly.',
                  'ATS 模式为极简设计，便于自动化筛选系统解析简历。您可以直接复制粘贴文本到 ATS 系统中。',
                ][lang]
              : [
                  'HR mode is optimized for human review, with more visual elements to enhance readability.',
                  'HR 模式专为人工审核优化，包含更多视觉元素以提升简历的可读性。',
                ][lang]
              }
            </motion.p>
          </div>
          {isATSMode ?
            <div>
              <CVs />
            </div>
          : <div>
              <CV printMode={print} />

              {/* <div className='mt-[70px]  flex justify-center text-[7px] lg:text-[15px]'>
                The above is optimized for human review, with more visual
                elements to enhance readability.
              </div>
              <div className='mt-[10px]  flex justify-center text-[7px] lg:text-[15px]'>
                The following section is simplified for easy parsing by
                automated systems(ATS). (Their contents are identical.)
              </div>
              {print && <CVs scale={0.6} />} */}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
