"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { findSelectableMatch, nextSelectableIndex } from "@/lib/select-navigation";

export interface CustomSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CustomSelectProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly CustomSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

export function CustomSelect({
  id,
  name,
  label,
  value,
  onValueChange,
  options,
  placeholder = "Choose an option",
  disabled = false,
  required = false,
  invalid = false,
  describedBy,
  className,
}: CustomSelectProps) {
  const generatedId = useId();
  const triggerId = id ?? `${generatedId}-select`;
  const listId = `${triggerId}-options`;
  const labelId = `${triggerId}-label`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [opensUpward, setOpensUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const searchRef = useRef("");
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedIndex];
  const hasOptions = options.some((option) => !option.disabled);
  const isDisabled = disabled || !hasOptions;
  const effectiveOpen = isOpen && !isDisabled;

  useEffect(() => {
    if (!effectiveOpen) return;
    function handleOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleFocusLeave(event: FocusEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("focusin", handleFocusLeave);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("focusin", handleFocusLeave);
    };
  }, [effectiveOpen]);

  useEffect(() => {
    const list = listRef.current;
    const option = optionRefs.current[activeIndex];
    if (!effectiveOpen || !list || !option) return;
    const optionBottom = option.offsetTop + option.offsetHeight;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (optionBottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = optionBottom - list.clientHeight;
    }
  }, [activeIndex, effectiveOpen]);

  useEffect(() => () => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
  }, []);

  function openList(direction: 1 | -1 = 1) {
    if (isDisabled) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const roomBelow = window.innerHeight - rect.bottom;
      setOpensUpward(roomBelow < 256 && rect.top > roomBelow);
    }
    setActiveIndex(
      selectedOption && !selectedOption.disabled
        ? selectedIndex
        : nextSelectableIndex(options, direction === 1 ? -1 : 0, direction),
    );
    setIsOpen(true);
  }

  function chooseOption(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    onValueChange(option.value);
    setIsOpen(false);
    searchRef.current = "";
    triggerRef.current?.focus({ preventScroll: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (isDisabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      if (!effectiveOpen) openList(direction);
      else setActiveIndex(nextSelectableIndex(options, activeIndex, direction));
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!effectiveOpen) openList();
      setActiveIndex(nextSelectableIndex(options, event.key === "Home" ? -1 : 0, event.key === "Home" ? 1 : -1));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (effectiveOpen) chooseOption(activeIndex);
      else openList();
      return;
    }
    if (event.key === "Escape" && effectiveOpen) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
      return;
    }
    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    const previousQuery = searchRef.current;
    const nextQuery = previousQuery + event.key;
    const query = Array.from(nextQuery).every((character) => character === nextQuery[0]) ? event.key : nextQuery;
    searchRef.current = query;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => { searchRef.current = ""; }, 650);
    const matchingIndex = findSelectableMatch(options, query, effectiveOpen ? activeIndex : selectedIndex);
    if (matchingIndex === -1) return;
    if (!effectiveOpen) openList();
    setActiveIndex(matchingIndex);
  }

  return (
    <div ref={containerRef} className={cn("relative min-w-0", className)}>
      {label && (
        <label id={labelId} htmlFor={triggerId} className="mb-2 block text-sm font-medium text-midnight-navy">
          {label}{required && <span aria-hidden="true" className="ml-1 text-alpine-teal">*</span>}
        </label>
      )}
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-expanded={effectiveOpen}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-activedescendant={effectiveOpen && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        disabled={isDisabled}
        onClick={() => effectiveOpen ? setIsOpen(false) : openList()}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-none border border-midnight-navy/30 bg-white px-4 py-3 text-left text-base text-midnight-navy hover:border-alpine-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpine-teal disabled:cursor-not-allowed disabled:bg-midnight-navy/5 disabled:opacity-60",
          effectiveOpen && "border-alpine-teal",
          invalid && "border-red-800",
        )}
      >
        <span className={cn("min-w-0 break-words", !selectedOption && "text-slate-ink/70")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown aria-hidden="true" className={cn("size-4 shrink-0", effectiveOpen && "rotate-180")} />
      </button>
      {effectiveOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={label ? labelId : triggerId}
          data-lenis-prevent
          className={cn(
            "absolute inset-x-0 z-50 max-h-[min(16rem,40dvh)] overflow-y-auto overscroll-contain border border-midnight-navy/25 bg-white p-1 shadow-xl",
            opensUpward ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(element) => { optionRefs.current[index] = element; }}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={value === option.value}
              aria-disabled={option.disabled || undefined}
              tabIndex={-1}
              onPointerDown={(event) => event.preventDefault()}
              onPointerMove={(event) => { if (event.pointerType === "mouse" && !option.disabled) setActiveIndex(index); }}
              onClick={() => chooseOption(index)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") chooseOption(index); }}
              className={cn(
                "flex min-h-12 cursor-pointer items-center justify-between gap-3 px-3 py-3 text-sm text-midnight-navy",
                activeIndex === index && "bg-alpine-teal/10",
                value === option.value && "font-semibold",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <div className="min-w-0">
                <span className="block break-words">{option.label}</span>
                {option.description && <span className="mt-1 block text-xs leading-5 text-slate-ink/75">{option.description}</span>}
              </div>
              {value === option.value && <Check aria-hidden="true" className="size-4 shrink-0 text-alpine-teal" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
