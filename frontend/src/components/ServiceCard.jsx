import { Link } from 'react-router-dom';

// Color map for categories to give that rich Stitch aesthetic
const categoryStyles = {
  Identity: {
    bg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    iconName: 'fingerprint'
  },
  Finance: {
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    iconName: 'account_balance'
  },
  Banking: {
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    iconName: 'savings'
  },
  Bills: {
    bg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    iconName: 'receipt_long'
  },
  Travel: {
    bg: 'bg-purple-50',
    iconColor: 'text-purple-700',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    iconName: 'travel_explore'
  },
  Documents: {
    bg: 'bg-teal-50',
    iconColor: 'text-teal-700',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-800',
    iconName: 'description'
  }
};

const defaultStyle = {
  bg: 'bg-slate-50',
  iconColor: 'text-[#00142f]',
  badgeBg: 'bg-slate-100',
  badgeText: 'text-slate-800',
  iconName: 'category'
};

export default function ServiceCard({ service }) {
  const catStyle = categoryStyles[service.category] || defaultStyle;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-lg ${catStyle.bg} ${catStyle.iconColor} flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform`}>
            {service.icon && !service.icon.startsWith('http') && service.icon.length <= 3 ? (
              <span>{service.icon}</span>
            ) : (
              <span className="material-symbols-outlined text-2xl">{catStyle.iconName}</span>
            )}
          </div>
          <span className={`px-2 py-0.5 ${catStyle.badgeBg} ${catStyle.badgeText} text-[11px] font-semibold rounded uppercase tracking-wide`}>
            {service.category || 'Official'}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#00142f] group-hover:text-[#a73a00] transition-colors leading-snug">
          {service.name}
        </h3>

        <p className="text-xs text-[#44474e] mt-1.5 line-clamp-2 leading-relaxed">
          {service.description || (service.items && service.items.join(', ')) || 'Assisted digital filing and online verification.'}
        </p>

        {service.items && service.items.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {service.items.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">
                {item}
              </span>
            ))}
            {service.items.length > 3 && (
              <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
                +{service.items.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <span className="material-symbols-outlined text-[15px] text-[#0d9488]">schedule</span>
          <span>Turnaround: {service.processingTime || '24–48 Hours'}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block font-normal leading-none mb-0.5">Fee / Charges</span>
          <span className="text-sm font-bold text-[#00142f]">
            {service.price || `₹${service.amount || 150}`}
          </span>
        </div>

        <Link
          to={`/service/${service._id || service.id}`}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#00142f] text-white text-xs font-semibold rounded-lg hover:bg-[#a73a00] transition-colors shadow-sm"
        >
          <span>Apply Now</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}