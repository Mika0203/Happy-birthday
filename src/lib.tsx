export const FilesToFormData = (files : File[]) : FormData => {
    const frm = new FormData();
    files.forEach(photo => {frm.append('photo', photo)});
    return frm;
};