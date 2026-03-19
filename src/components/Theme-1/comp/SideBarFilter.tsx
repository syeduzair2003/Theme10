import React from 'react'
import Link from 'next/link'
import { CategoryData } from '@/services/dataTypes'

interface Props {
  categories: CategoryData[],
  slug_type: string,
  cat_slug: string,
  mt?: string,
}

const SideBarFilter = ({ categories, cat_slug, slug_type, mt }: Props) => {
  const getHref = (category: CategoryData) => `/${cat_slug}/${category[slug_type as keyof CategoryData] || category.slug}`;

  return (
    <>
      <div className={`common-sidebar-wrapper sidebar-bg` + (mt ? ` mt-${mt}` : '')}>
        <div className="common-sidebar">
          <h2 className="common-sidebar__title f-25" style={{ textAlign: "center", marginBottom: "10px" }}> Categories <span className="qty">({categories?.length})</span></h2>
          <ul className="category-list">
            {categories?.length > 0 && categories?.map((category: CategoryData, i: number) => {
              const href = getHref(category);
              return (
                <li key={i} className="category-list__item">
                  <Link
                    href={href}
                    className="category-list__link flx-align flex-nowrap gap-2 text-body hover-text-main"
                  >
                    <span className="icon font-12">
                      {" "}
                      <i className="fas fa-chevron-right" />
                    </span>
                    <span className="text">{category?.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideBarFilter
