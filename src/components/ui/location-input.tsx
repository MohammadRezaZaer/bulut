import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Import JSON data directly
import states from "@/data/states.json"
import cities from "@/data/cities.json"

interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

interface CityProps {
  "id": number,
  "title": string,
  "slug": string,
  "province_id": number,
  "latitude": number,
  "longitude": number
}

interface StateMeProps {
  "id": number,
  "title": string,
  "slug": string,
  "latitude": number,
  "longitude": number
}

interface LocationSelectorProps {
  disabled?: boolean
  onCountryChange?: (country: StateMeProps | null) => void
  onStateChange?: (state: CityProps | null) => void
}

const LocationSelector = ({
  disabled,
  onCountryChange,
  onStateChange,
}: LocationSelectorProps) => {
  const [selectedState, setSelectedState] = useState<StateMeProps | null>(
    null,
  )
  const [selectedCity, setSelectedCity] = useState<CityProps | null>(null)
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false)
  const [openStateDropdown, setOpenStateDropdown] = useState(false)

  // Cast imported JSON data to their respective types
  const statesData = states as StateMeProps[]
  const citiesData = cities as CityProps[]

  // Filter states for selected country
  const availableCities = citiesData.filter(
    (city) => city.province_id === selectedState?.id,
  )

  const handleCountrySelect = (country: StateMeProps | null) => {
    setSelectedState(country)
    setSelectedCity(null) // Reset state when country changes
    onCountryChange?.(country)
    onStateChange?.(null)
  }

  const handleStateSelect = (state: CityProps | null) => {
    setSelectedCity(state)
    onStateChange?.(state)
  }

  return (
    <div className="flex gap-4">
      {/* Country Selector */}
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountryDropdown}
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedState ? (
              <div className="flex items-center gap-2">
                {/*<span>{selectedState.emoji}</span>*/}
                <span>{selectedState.title}</span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[280px]">
                  {statesData.map((state) => (
                      <CommandItem
                          key={state.id}
                          value={state.title}
                          onSelect={() => {
                            handleCountrySelect(state)
                            setOpenCountryDropdown(false)
                          }}
                          className="flex cursor-pointer items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          {/*<span>{state.emoji}</span>*/}
                          <span>{state.title}</span>
                        </div>
                        <Check
                            className={cn(
                                "'h-4 w-4'",
                                selectedState?.id === state.id
                                    ? "'opacity-100'"
                                    : "'opacity-0'",
                            )}
                        />


                      </CommandItem>
                  ))}
                  <ScrollBar orientation="vertical"/>
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* State Selector - Only shown if selected country has states */}
      { (
        <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStateDropdown}
              disabled={!selectedState}
              className="w-full justify-between"
            >
              {selectedCity ? (
                <span>{selectedCity.title}</span>
              ) : (
                <span>Select State...</span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandList>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[280px]">
                    {availableCities.map((state) => (
                        <CommandItem
                            key={state.id}
                            value={state.title}
                            onSelect={() => {
                              handleStateSelect(state)
                              setOpenStateDropdown(false)
                            }}
                            className="flex cursor-pointer items-center justify-between text-sm"
                        >
                          <span>{state.title}</span>
                          <Check
                              className={cn(
                                  "'h-4 w-4'",
                                  selectedCity?.id === state.id
                                      ? "'opacity-100'"
                                      : "'opacity-0'",
                              )}
                          />


                        </CommandItem>
                    ))}
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default LocationSelector
