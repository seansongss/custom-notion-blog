export const koreanSlugify = (str: string): string => {
    str = str.toLowerCase();

    str = str.replace(/\s+/g, '-');

    str = str.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-z0-9-]/g, '');

    str = str.replace(/-+/g, '-');

    str = str.replace(/^-+|-+$/g, '');

    return str;
}