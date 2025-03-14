import React from 'react'
import TopDonors from '../components/TopDonors'
import Statistics from '../components/Statistics'
import NoticeForMother from '../components/NoticeForMother'
import GroupNames from '../components/GroupNames'
import { Helmet } from 'react-helmet-async';
import NoticeBoard from '../components/organization/NoticeBoard'
import ThisMonthDonors from '../components/ThisMonthDonors'
import Search from '../components/Search'
export default function Home() {
  return (
    <div>
        <Helmet>
          <title> হোমপেইজ - রক্ত ডট ইনফো </title>
          <meta name="description" content="রক্ত.ইনফো (Rokto.Info) একটি ব্লাড ডিরেক্টরি ওয়েবসাইট যার মাধ্যমে রক্তদাতাকে খুঁজে বের করা যাবে।" />
          <meta name="keywords" content="রক্ত, রক্তদান, ডোনার, পরিসংখ্যান" />
          <meta property="og:title" content="হোমপেইজ - রক্ত ডট ইনফো" />
          <meta property="og:description" content="রক্ত.ইনফো (Rokto.Info) একটি ব্লাড ডিরেক্টরি ওয়েবসাইট যার মাধ্যমে রক্তদাতাকে খুঁজে বের করা যাবে।" />
          <meta property="og:image" content="https://i.ibb.co.com/CLBwD0z/cropped-logocircle-1.webp" />
          <meta name="robots" content="index, follow" />
        </Helmet>
        
        <NoticeForMother></NoticeForMother>
        <Search></Search>
        <NoticeBoard></NoticeBoard>
        <GroupNames></GroupNames>
        <TopDonors></TopDonors>
        <ThisMonthDonors></ThisMonthDonors>
        <Statistics></Statistics>
    </div>

  )
}
