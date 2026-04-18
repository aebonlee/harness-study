import type { ReactElement } from 'react';

export type NavSub  = { id: string; ko: string; en: string };
export type NavItem = { id: string; icon: string; ko: string; en: string; subs?: NavSub[] };
export type NavGroup = { label: string; labelEn: string; items: NavItem[] };

interface Props {
  groups: NavGroup[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onSubNavigate?: (subId: string) => void;
  isKo: boolean;
}

export default function GuideSidebar3({
  groups,
  activeSection,
  onNavigate,
  onSubNavigate,
  isKo,
}: Props): ReactElement {
  return (
    <aside className="guide-sidebar">
      <div className="guide-sidebar-title">{isKo ? '목차' : 'Contents'}</div>
      {groups.map((group, gi) => (
        <div key={gi} className="guide-nav-group">
          <div className="guide-group-label">
            {isKo ? group.label : group.labelEn}
          </div>
          <ul className="guide-nav">
            {group.items.map(item => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="guide-nav-item">
                  <button
                    className={`guide-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    <i className={`fa-solid ${item.icon}`} />
                    <span>{isKo ? item.ko : item.en}</span>
                  </button>
                  {isActive && item.subs && item.subs.length > 0 && (
                    <div className="guide-nav-subs">
                      {item.subs.map(sub => (
                        <button
                          key={sub.id}
                          className="guide-nav-sub-btn"
                          onClick={() => onSubNavigate?.(sub.id)}
                        >
                          • {isKo ? sub.ko : sub.en}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
