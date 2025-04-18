export const convertToCSV = (modules)=>{
    const headers = ['Module', 'Test Case Name', 'Description', 'Status']
    const rows = []

    modules.forEach(mod =>{
        mod.testCases.forEach(tc=>{
            rows.push([mod.module, tc.name, tc.description, tc.status])
        })
    })

    const csvContent = [
        headers.join(','),
        ...rows.map(row=>row.map(cell=>`"${cell}"`).join(','))
    ].join('\n')

    return csvContent
}



