import loansData from './data/loansData.json'

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '—'
  }

  return currency.format(Number(value))
}

function App() {
  const loans = loansData.loans

  const firstLoan = loans[0]
  const secondLoan = loans[1]

  const totalPaid = loans.reduce((sum, loan) => sum + Number(loan.paidValue || 0), 0)
  const totalRemaining = loans.reduce((sum, loan) => sum + Number(loan.remainingValue || 0), 0)
  const totalValue = loans.reduce((sum, loan) => sum + Number(loan.totalValue || 0), 0)

  const firstLoanPaid = firstLoan.payments.filter((item) => item.status === 'pago').reduce((sum, item) => sum + Number(item.paidAmount || 0), 0)
  const secondLoanPaid = secondLoan.payments.filter((item) => item.status === 'pago').reduce((sum, item) => sum + Number(item.paidAmount || 0), 0)

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Resumo financeiro</p>
          <h1>Histórico de pagamentos do carro</h1>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card primary">
          <span>Valor total</span>
          <strong>{formatMoney(totalValue)}</strong>
          <small>Somatório dos dois empréstimos</small>
        </article>

        <article className="stat-card success">
          <span>Já pago</span>
          <strong>{formatMoney(totalPaid)}</strong>
          <small>Pagamentos realizados</small>
        </article>

        <article className="stat-card warning">
          <span>Falta pagar</span>
          <strong>{formatMoney(totalRemaining)}</strong>
          <small>Saldo pendente</small>
        </article>

        <article className="stat-card muted">
          <span>Percentual pago</span>
          <strong>{(((totalPaid / totalValue) * 100) || 0).toFixed(2)}%</strong>
          <small>Proporção do total quitado</small>
        </article>
      </section>

      <main className="content-grid">
        <section className="loan-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Empréstimo 1</p>
              <h2>Parcelas com data e vencimento</h2>
            </div>
            <span className="badge total">{formatMoney(firstLoan.totalValue)}</span>
          </div>

          <div className="summary-row">
            <div>
              <label>Pago</label>
              <strong>{formatMoney(firstLoanPaid)}</strong>
            </div>
            <div>
              <label>Restante</label>
              <strong>{formatMoney(firstLoan.remainingValue)}</strong>
            </div>
            <div>
              <label>Parcela</label>
              <strong>{formatMoney(firstLoan.installmentValue)}</strong>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>N Parcela</th>
                  <th>Data Pgto</th>
                  <th>Data Venc.</th>
                  <th>Parcela</th>
                  <th>Pago</th>
                </tr>
              </thead>
              <tbody>
                {firstLoan.payments.map((payment) => (
                  <tr key={payment.parcel} className={payment.status === 'pago' ? 'is-paid' : ''}>
                    <td>{payment.parcel}</td>
                    <td>{payment.paymentDate || '—'}</td>
                    <td>{payment.dueDate || '—'}</td>
                    <td>{formatMoney(payment.installmentValue)}</td>
                    <td>{formatMoney(payment.paidAmount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>{formatMoney(firstLoanPaid)}</td>
                  <td>{formatMoney(firstLoan.totalValue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="loan-panel secondary">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Empréstimo 2</p>
              <h2>Financiamento sem data fixa</h2>
            </div>
            <span className="badge total">{formatMoney(secondLoan.totalValue)}</span>
          </div>

          <div className="summary-row">
            <div>
              <label>Pago</label>
              <strong>{formatMoney(secondLoanPaid)}</strong>
            </div>
            <div>
              <label>Restante</label>
              <strong>{formatMoney(secondLoan.remainingValue)}</strong>
            </div>
            <div>
              <label>Pagamento</label>
              <strong>{secondLoan.installmentValue ? formatMoney(secondLoan.installmentValue) : 'Sem valor fixo'}</strong>
            </div>
          </div>

          <div className="mini-table">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {secondLoan.payments.map((payment) => (
                  <tr key={`${payment.paymentDate}-${payment.paidAmount}`}>
                    <td>{payment.paymentDate}</td>
                    <td>{formatMoney(payment.paidAmount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{formatMoney(secondLoanPaid)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
