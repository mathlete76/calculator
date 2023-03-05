import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const programProvider = program.provider as anchor.AnchorProvider;

  const calculatorPair = anchor.web3.Keypair.generate();
  const text = "Winter SOS 2023";

  it("Creating Calculator Instance", async () => {
    // calling create instance
    await program.methods.create(text).accounts(
      {
        calculator: calculatorPair.publicKey,
        user: programProvider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,  
      }
    ).signers([calculatorPair]).rpc()

    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.greeting).to.equal(text)
  });

  it("Addition", async () => {
    // calling addition
    await program.methods.add(new anchor.BN(2), new anchor.BN(3))
    .accounts(
      {
        calculator: calculatorPair.publicKey,
      })
      .rpc()

    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(5));
  });

  it("Subtraction", async () => {
    // calling subtraction
    await program.methods.sub(new anchor.BN(2), new anchor.BN(3))
    .accounts(
      {
        calculator: calculatorPair.publicKey,
      })
      .rpc()

    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(-1));
  });

  it("Multiplication", async () => {
    // calling multiplication
    await program.methods.mul(new anchor.BN(2), new anchor.BN(3))
    .accounts(
      {
        calculator: calculatorPair.publicKey,
      })
      .rpc()

    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(6));
  } );

  it("Division", async () => {
    // calling division
    await program.methods.div(new anchor.BN(6), new anchor.BN(2))
    .accounts(
      {
        calculator: calculatorPair.publicKey,
      })
      .rpc()

    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(3));
  } );
});
