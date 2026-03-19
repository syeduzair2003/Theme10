import { CategoryData } from '@/services/dataTypes'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  category: CategoryData,
  slug_type: string,
  cat_slug: string
}

const AllCategories = ({ category, slug_type, cat_slug }: Props) => {
  const getHref = (category: CategoryData) => `/${cat_slug}/${category[slug_type as keyof CategoryData] || category.slug}`;
  const href = getHref(category);

  return (
    <>
      <div className="col-xl-3 col-sm-4" style={{ height: "180px" }}>
        <div className="product-item">
          <div className="product-item__thumb d-flex" style={{ textAlign: "center" }}>
            <Link href={href} className="link w-100" style={{ borderRadius: '50%' }}>
              <FontAwesomeIcon icon={faThumbsUp} className="fa-fw" size="3x" />
            </Link>
          </div>
          <div className="product-item__content">
            <h6 className="product-item__title">
              <Link href={href} className="link" style={{ textAlign: "center" }}>
                {category?.name}
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllCategories
