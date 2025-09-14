"use client";
 import React from 'react'
 
 export default function AboutLayout({children}) {
   return (
        <html lang='en'>
            <body>
                <div>
                    <h1>About Layout</h1>
                    {children}
                </div>
            </body>
        </html>
   )
 }
 