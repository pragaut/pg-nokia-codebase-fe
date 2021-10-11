import React from 'react';
import Link from 'next/link';


export default function NotFound() {
    return (
        <span>Would you like to try our <Link href={{pathname: '/', query: { page: 'products', category: 'men', subCategory: '' }}} as={`/products/men`}>
<a tabindex="-1">Men's</a>
</Link>&nbsp;section?
<br />
<br />
Or, perhapes our <Link href={{pathname: '/', query: { page: 'products', category: 'women', subCategory: '' }}} as={`/products/women`}>
<a tabindex="-1">Women's</a>
</Link>&nbsp;section?<br /><br />

Or, may be our amazing <Link href={{pathname: '/', query: { page: 'products', category: 'women', subCategory: '' }}} as={`/products/accessories`}>
<a tabindex="-1">Accessories</a>
</Link>&nbsp;section?</span>)
}
