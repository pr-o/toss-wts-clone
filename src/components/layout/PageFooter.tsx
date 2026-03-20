export function PageFooter() {
  return (
    <footer className="bg-[var(--tds-surface-base)] px-6 py-6 text-center text-[var(--tds-text-secondary)]">
      <div className="mb-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
        <span>
          이 웹사이트는 포트폴리오 용도로 토스증권을 모방한 사이트입니다.
        </span>
      </div>
      <p className="mt-2 text-[10px]">ⓒ 2024 토스증권. All rights reserved.</p>
    </footer>
  );
}
