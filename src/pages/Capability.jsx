/** @format */

import React, { useState, useEffect } from 'react';
import Database from '../data/Database.json';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import {
  hideRow,
  bgPic,
  useLanguage,
  SelectText,
} from '../help/helpFunction.js';
import Skill from '../conponent/SkillNew.jsx';
import Gooduser from '../conponent/Gooduser.jsx';
import Otherability from '../conponent/Otherability.jsx';
import PersonalityandLanguage from '../conponent/PersonalityandLanguage.jsx';
import Highquality from '../conponent/Highquality.jsx';

// loaddata
const language = Database.PersonalInfo.Capability.language;
const personality = Database.PersonalInfo.Capability.personality;
const apps = Database.PersonalInfo.Capability.Apps;
const frontEnd = Database.PersonalInfo.Capability['front-end'];
const BackendEnd = Database.PersonalInfo.Capability['backend-end'];
const database = Database.PersonalInfo.Capability.database;
const algorithm = Database.PersonalInfo.Capability.Algorithm;
const other = Database.PersonalInfo.Capability.other;

// animation
const StagerFadeInUp = Database.Animation.Transition.StagerFadeInUp;
const fastWelcomevisblecontainer =
  Database.Animation.Variant.fastWelcomevisblecontainer;
const Welcomevisblecontainer =
  Database.Animation.Variant.Welcomevisblecontainer;
const WelcomeItem = Database.Animation.Variant.WelcomeItem;
const ProgressBar = Database.Animation.Transition.ProgressBar;
const ProgressBarvisblecontainer =
  Database.Animation.Variant.ProgressBarvisblecontainer;
const ProgressBarItem = Database.Animation.Variant.ProgressBarItem;
const visblecontainer = Database.Animation.Variant.Welcomevisblecontainer;
const item = Database.Animation.Variant.WelcomeItem;

const tabs = [
  {
    label: ['Frontend', '前端'],
    color1: 'red-500',
    color2: 'red-700',
    content: 'Content for Frontend Tab',
  },
  {
    label: ['Backend', '后端'],
    color1: 'orange-500',
    color2: 'amber-500',
    content: 'Content for Backend Tab',
  },
  {
    label: ['DataBase', '数据库'],
    color1: 'sky-500',
    color2: 'emerald-500',
    content: 'Content for Data Tab',
  },
  {
    label: ['Algorithm', '算法'],
    color1: 'cyan-500',
    color2: 'blue-500',
    content: 'Content for Algorithm Tab',
  },
  {
    label: ['Other', '其他'],
    color1: 'indigo-500',
    color2: 'pink-500',
    content: 'Content for Other Tab',
  },
];

function Capability() {
  const lang = useLanguage();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Capability = (
    <div className='relative flex flex-col items-center w-full'>
      {/* <div className='absolute translate-y-[40px] flex w-full -mt-[40px] bg-gradient-to-t from-[#494944] to-transparent h-[0px]  -z-10'></div> */}
      {/* <div className='absolute top-0 flex bottom-0 items-center justify-center w-full h-full via-[#131313] bg-gradient-to-b from-[#494944] via-[90%] to-transparent to-[100%]  -z-10'></div> */}
      <div
        style={{
          paddingInline:
            windowWidth > 1024 ?
              'calc(50vw - min(1680px, var(--global-viewport-content-responsive)) / 2)'
            : '10px',
        }}
        className='flex w-full '
      >
        {' '}
        <motion.div
          id='Capability'
          className='grid grid-cols-12 gap-[14px] lg:gap-[28px] py-48 '
        >
          {/* stack */}
          <Skill />
          {/* <Keyfeature2 />
    <Highlight /> */}

          {/* High Quality */}
          <Highquality />
          {/* row2-left */}
          <Otherability />
          {/* good user */}
          <Gooduser />
          <PersonalityandLanguage />

          {/* INFJ instruction hover */}
          <motion.div
            initial={{ scale: 0, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            id={`infj`}
            role='tooltip'
            className='m-[20px] absolute z-30 invisible rounded-[28px] flex w-[300px] md:w-[400px] lg:w-[800px]  transition-opacity duration-300 backdrop-blur-lg bg-white shadow-2xl opacity-0 darrk:text-gray-400 darrk:border-gray-600 darrk:bg-gray-800'
          >
            <motion.div className='p-[40px]'>
              <p className='text-[17px] md:text-[18px] lg:text-[20px] text-gray-900  py-4 text-center font-black '>
                {lang == 0 && 'Click to learn infj'}
                {lang == 1 && '点击了解infj人格'}
              </p>
              <motion.div className='text-[14px] md:text-[17px] lg:text-[14px] text-gray-500 text-left font-mono'>
                {personality.Mbti[lang].split('\n').map((paragraph, index) => (
                  <motion.div key={index}>
                    <p className='mb-2'>{SelectText(paragraph)}</p>
                    <br className='border-b' />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div tooltip-arrow></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div className='z-30 md:-mt-[100px] lg:-mt-[20px] w-full flex'>
      {Capability}
    </motion.div>
  );
}

export default Capability;
