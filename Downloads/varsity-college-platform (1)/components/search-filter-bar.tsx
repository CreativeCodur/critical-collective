import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"

interface SearchFilterBarProps {
  searchValue: string
  onSearchValueChange: (v: string) => void
  onSearch: () => void
  onFilterClick: () => void
  onClear: () => void
  loading?: boolean
  searchPlaceholder?: string
  buttonLabel?: string
  extraFilters?: React.ReactNode
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
  onFilterClick,
  onClear,
  loading,
  searchPlaceholder = "Search...",
  buttonLabel = "Search",
  extraFilters,
}) => {
  return (
    <div
      className="w-full max-w-5xl mx-auto mb-10 px-2"
      style={{ zIndex: 2, position: 'relative' }}
    >
      <div
        className="flex flex-col md:flex-row items-center gap-3 md:gap-4 bg-white/60 backdrop-blur-lg shadow-xl rounded-full py-3 px-4 md:px-6 border border-white/20"
        style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.04)' }}
      >
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
            className="pl-12 pr-4 h-12 rounded-full bg-white/80 border-none shadow-none text-[#0a1a3a] placeholder:text-gray-400 focus:ring-2 focus:ring-[#a2c8ff] transition-all"
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Button
          type="button"
          onClick={onFilterClick}
          variant="outline"
          className="h-12 rounded-full px-6 flex items-center gap-2 border-none bg-white/70 hover:bg-[#a2c8ff]/20 text-[#0a1a3a] font-semibold shadow-none text-base transition-all"
        >
          <Filter className="w-5 h-5" />
          Filters
        </Button>
        <Button
          type="button"
          onClick={onClear}
          variant="ghost"
          className="h-12 rounded-full px-6 text-[#0a1a3a] font-semibold shadow-none text-base transition-all"
        >
          Clear
        </Button>
      </div>
      {extraFilters && (
        <div className="mt-4 w-full">{extraFilters}</div>
      )}
    </div>
  )
}

export default SearchFilterBar 