import React from 'react'
import Head from 'next/head'

const Header = ({title,description,keywords,url,img,robots='nofollow, noindex'}) => {
  return (
    <Head>
        <title>{title ? title : 'Codes Wear'}</title>
        <meta name="description" content={description ? description : 'wear the code'} />
		<meta name="keywords" content={keywords ? keywords : 'wear the code, codes thsirt, code huddies'}/>
		<meta name="robots" content={robots} />
        <link rel="icon" href="/favicon.ico" />
		<meta property="og:title" content={title ? title : 'Codes Wear'} />
		<meta property="og:description" content={description ? description : 'wear the code'}/>
		<meta property="og:url" content={url}/>
		<meta property="og:site" content={process.env.NEXT_PUBLIC_HOST}/>
		<meta property="og:type" content="website"/>
		<meta property="og:image" content={img ? img : `${process.env.NEXT_PUBLIC_HOST}/logo.webp`}/>
		<meta property="og:image:width" content="1280" />
		<meta property="og:image:height" content="630" />
    </Head>
  )
}

export default Header